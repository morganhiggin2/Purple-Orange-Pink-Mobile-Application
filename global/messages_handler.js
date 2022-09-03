import { GlobalProperties } from "./global_properties";
import 'react-native-get-random-values';
import Realm from "realm";
import { UIImagePickerControllerQualityType } from "expo-image-picker";
import 'react-native-get-random-values';
import { Alert } from "react-native";

const { UUID } = Realm.BSON;

const MAX_NUM_MESSAGES = 100;

const HeaderRecordSchema = {
    name: "Messages_Header_Record",
	primaryKey: "_id",
    properties: {
		_id: "uuid",
		user_id: "string", //string of the user id that the message belongs to
        type: "int", //index of type in types array
        title: "string", //for direct message, person who sent it. for conversation, conversation name. 
        body: "string", //body of message to be displayed in messages feed
        last_timestamp: { type: "date", indexed: true},
        type_id: "string", //id of type, [conversation is conversation id, direct message is other user id, invitation is invitation id, none for announcemnet]
        sub_header_id: "uuid",
		read: "bool",
    },
}

//type direct message
const SubHeaderDirectMessageRecord = {
    name: "Messages_Sub_Header_Direct_Message_Record",
    primaryKey: "_id",
    properties: {
        _id: "uuid",
        parent_header_id: "uuid", //id of parent header
        other_user_id: "string",
        other_user_name: "string",
        last_user_id: "string", //last user for message of conversation, can be current user, for show_me
		messages_records_size: "int", //number of rmessages in message_records
        message_records: { type: "list", objectType: "Messages_Message_Record"}
    }
}

//type conversation
const SubHeaderConversationRecord = {
    name: "Messages_Sub_Header_Conversation_Record",
    primaryKey: "_id",
    properties: {
        _id: "uuid",
        parent_header_id: "uuid", //id of parent header
        conversation_id: "string",
        last_user_id: "string", //last user for message of conversation, can be current user, for show_me
		messages_records_size: "int", //number of messages in message_records
        message_records: { type: "list", objectType: "Messages_Message_Record"}
    }
}

//type invitation
const SubHeaderInvitationRecord = {
    name: "Messages_Sub_Header_Invitation_Record",
    primaryKey: "_id",
    properties: {
        _id: "uuid",
        parent_header_id: "uuid", //id of parent header
        invitation_id: "string",
		other_id: "string", 
		other_type: "string"
    }
}

//type announcement
const SubHeaderAnnouncementRecord = {
    name: "Messages_Sub_Header_Announcement_Record",
    primaryKey: "_id",
    properties: {
        _id: "uuid",
        parent_header_id: "uuid",
        other_id: "string", //the id of the other type
		other_type: "string" //e.g. Activity, Group
    }
}

//message record
const MessageRecord = {
    name: "Messages_Message_Record",
    embedded: true,
    properties: {
        from_id: "string",
		user_name: "string",
        id: "int", //has to be unique for the flat list to render
        message: "string",
        show_name: "bool", //wether to show name, based on if the last message is from the same person or not
    }
}

//deleteRealmIfMigrationNeeded: true
export class MessageHandler {
    constructor() {
        
        this.masterRealm = null;
        this.masterHeader = null;
		this.open = false;
          
        this.insertMessage = this.insertMessage.bind(this);
        this.delete = this.delete.bind(this);
        this.getConversationInformation = this.getConversationInformation.bind(this);
        this.getDirectMessageInformation = this.getDirectMessageInformation.bind(this);
        this.getInvitationInformation = this.getInvitationInformation.bind(this);
        this.insertMessages = this.insertMessages.bind(this);
    }

	async openRealm() {
		if (!this.open) {
			this.masterRealm = await Realm.open({
				path: "friend_messages_realm_database",
				schemaVersion: 1.0,
				schema: [HeaderRecordSchema, SubHeaderDirectMessageRecord, SubHeaderConversationRecord, SubHeaderInvitationRecord, SubHeaderAnnouncementRecord, MessageRecord],
			  });

			this.open = true;
		}
	}

	closeRealm() {
		this.open = false;

		this.masterRealm.close();
	}

    //json object
    async insertMessage(message) {

		var found = false;
		var headerRow = null;

		if (message.type == "direct") { 
			//get header row
			headerRow = await this.masterRealm.objects("Messages_Header_Record").filtered("type_id = '" + message.other_user_id + "' AND type = 0 AND user_id = '" + GlobalProperties.user_id + "'");

			//check if we found it
			found = headerRow.length > 0;

			if (found) {
				//get first (and hopefully only component)
				headerRow = headerRow[0];

				//get sub header
				var subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Direct_Message_Record", headerRow.sub_header_id);

				this.masterRealm.write(() => {
					//modify header
					headerRow.body = message.body;
					headerRow.read = false,

					headerRow.last_timestamp = new Date(parseInt(message.timestamp));

					var show_name = subHeader.last_user_id != message.user_id;

					//modify subheader
					subHeader.last_user_id = message.user_id;

					subHeader.message_records.unshift({
						from_id: message.user_id,
						id: subHeader.messages_records_size, //has to be unique for the flat list to render
						message: message.body,
						user_name: message.user_name,
						show_name: show_name
					});

					subHeader.messages_records_size++;

					if (subHeader.messages_records_size == MAX_NUM_MESSAGES) {
						subHeader.message_records.remove(0);
						subHeader.messages_records_size--;
					}
				});
			}
			else {
				var subHeaderId = new UUID();
				var parentHeaderId = new UUID();

				this.masterRealm.write(() => {
					//create master header record
					this.masterRealm.create("Messages_Header_Record", {
						_id: parentHeaderId,
						user_id: GlobalProperties.user_id,
						type_id: message.other_user_id, 
						sub_header_id: subHeaderId,
						type: 0,
						title: message.user_name,  
						body: message.body,
						last_timestamp: new Date(parseInt(message.timestamp)),
						read: false,
					});

					//create the sub header
					const subHeader = this.masterRealm.create("Messages_Sub_Header_Direct_Message_Record", 
					{
						_id: subHeaderId,
						parent_header_id: parentHeaderId,
						other_user_id: message.user_id,
						other_user_name: message.user_name,
						last_user_id: message.user_id,
						messages_records_size: 0,
						message_records: [],   
					});

					subHeader.message_records.push({
						from_id: message.user_id,
						id: subHeader.messages_records_size, //has to be unique for the flat list to render
						message: message.body,
						user_name: message.user_name,
						show_name: true
					});

					subHeader.messages_records_size++;
				});
			}
		}
		else if (message.type == "conversation") {
			//get header row
			headerRow = await this.masterRealm.objects("Messages_Header_Record").filtered("type_id = '" + message.conversation_id + "' AND type = 1 AND user_id = '" + GlobalProperties.user_id + "'");

			//check if we found it
			found = headerRow.length > 0;

			if (found) {
				//get first (and hopefully only component)
				headerRow = headerRow[0];

				//get sub header
				var subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Conversation_Record", headerRow.sub_header_id);
				this.masterRealm.write(() => {
					//modify header
					headerRow.body = message.body;
					headerRow.read = false,

					headerRow.last_timestamp = new Date(parseInt(message.timestamp));

					var show_name = subHeader.last_user_id != message.user_id;

					//modify subheader
					subHeader.last_user_id = message.user_id;

					subHeader.message_records.unshift({
						from_id: message.user_id,
						id: subHeader.messages_records_size, //has to be unique for the flat list to render
						message: message.body,
						user_name: message.user_name,
						show_name: show_name
					});

					subHeader.messages_records_size++;

					if (subHeader.messages_records_size == MAX_NUM_MESSAGES) {
						subHeader.message_records.remove(0);
						subHeader.messages_records_size--;
					}
				});
			}
			else {
				var subHeaderId = new UUID();
				var parentHeaderId = new UUID();

				this.masterRealm.write(() => {
					//create master header record
					this.masterRealm.create("Messages_Header_Record", {
						_id: parentHeaderId,
						user_id: GlobalProperties.user_id,
						type_id: message.conversation_id, 
						sub_header_id: subHeaderId,
						type: 1,
						title: message.conversation_name,  
						body: message.body,
						last_timestamp: new Date(parseInt(message.timestamp)),
						read: false,
					});

					//create the sub header
					const subHeader = this.masterRealm.create("Messages_Sub_Header_Conversation_Record", 
					{
						_id: subHeaderId,
						parent_header_id: parentHeaderId,
						conversation_id: message.conversation_id,
						last_user_id: message.user_id,
						messages_records_size: 0,
						message_records: [],   
					});

					subHeader.message_records.push({
						from_id: message.user_id,
						id: subHeader.messages_records_size, //has to be unique for the flat list to render
						message: message.body,
						user_name: message.user_name,
						show_name: true
					});

					subHeader.messages_records_size++;
				});
			}
		}
		else if (message.type == "invitation") {
			//get header row
			headerRow = await this.masterRealm.objects("Messages_Header_Record").filtered("type_id = '" + message.other_user_id + "' AND type = 2 AND user_id = '" + GlobalProperties.user_id + "'");

			//check if we found it
			found = headerRow.length > 0;

			if (found) {
				//get first (and hopefully only component)
				headerRow = headerRow[0];

				//delete header row and sub header

				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Invitation_Record", headerRow.sub_header_id);

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});
			}

			//create invitation
			var subHeaderId = new UUID();
			var parentHeaderId = new UUID();

			this.masterRealm.write(() => {
				//create master header record
				this.masterRealm.create("Messages_Header_Record", {
					_id: parentHeaderId,
					user_id: GlobalProperties.user_id,
					type_id: message.invitation_id, 
					sub_header_id: subHeaderId,
					type: 2,
					title: message.name,  
					body: message.body,
					last_timestamp: new Date(parseInt(message.timestamp)),
					read: false,
				});

				//create the sub header
				const subHeader = this.masterRealm.create("Messages_Sub_Header_Invitation_Record", 
				{
					_id: subHeaderId,
					parent_header_id: parentHeaderId,
					invitation_id: message.invitation_id,
					other_type: message.other_type,
					other_id: message.other_id
				});
			});
			
		}
		else if (message.type == "announcement") {
			//create accounement
			var subHeaderId = new UUID();
			var parentHeaderId = new UUID();

			this.masterRealm.write(() => {
				//create master header record
				this.masterRealm.create("Messages_Header_Record", {
					_id: parentHeaderId,
					user_id: GlobalProperties.user_id,
					type_id: "", 
					sub_header_id: subHeaderId,
					type: 3,
					title: message.name,  
					body: message.body,
					last_timestamp: new Date(parseInt(message.timestamp)),
					read: false,
				});

				//create the sub header
				const subHeader = this.masterRealm.create("Messages_Sub_Header_Announcement_Record", 
				{
					_id: subHeaderId,
					parent_header_id: parentHeaderId,
					other_id: message.announcement_id,
					other_type: message.announcement_type
				});
			});
		}
		else {
			return;
		}
    }

    //json array
    async insertMessages(messages) {
		try {
			for (var i = 0; i < messages.length; i++) {
				await this.insertMessage(messages[i]);
			}	
		} catch (error) {
			Alert.alert("Cannot add messages, are you out of memory?");
		}
    }

	//query for messages for your messages screen
	async getMessageHeaders() {
		var messageHeaders = null;

		if (GlobalProperties.messages_filter_type == "all") {
			messageHeaders = await this.masterRealm.objects("Messages_Header_Record").filtered("user_id = '" + GlobalProperties.user_id + "'").sorted('last_timestamp', true);
		}
		else if (GlobalProperties.messages_filter_type == "direct messages") {
			messageHeaders = await this.masterRealm.objects("Messages_Header_Record").filtered("type = 0 AND user_id = '" + GlobalProperties.user_id + "'").sorted('last_timestamp', true);
		}
		else if (GlobalProperties.messages_filter_type == "conversations") {
			messageHeaders = await this.masterRealm.objects("Messages_Header_Record").filtered("type = 1 AND user_id = '" + GlobalProperties.user_id + "'").sorted('last_timestamp', true);
		}
		else if (GlobalProperties.messages_filter_type == "invitations") {
			messageHeaders = await this.masterRealm.objects("Messages_Header_Record").filtered("type = 2 AND user_id = '" + GlobalProperties.user_id + "'").sorted('last_timestamp', true);
		}
		else if (GlobalProperties.messages_filter_type == "announcements") {
			messageHeaders = await this.masterRealm.objects("Messages_Header_Record").filtered("type = 3 AND user_id = '" + GlobalProperties.user_id + "'").sorted('last_timestamp', true);
		}

		return messageHeaders;
	}

	async readMessage(_id) {
		var messageHeader = await this.masterRealm.objectForPrimaryKey("Messages_Header_Record", _id);

		this.masterRealm.write(() => {
			messageHeader.read = true
		});
	}

    //messages screen already go on masterheader, since they are always linked
    //so just call messages to be reloaded and it will auto update after insertion

	//create direct message conversation
	//return parent header id
	async createDirectMessage(type_id, name) {
		//check if already exists
		var headerRow = await this.masterRealm.objects("Messages_Header_Record").filtered("type_id = '" + type_id + "' AND type = 0 AND user_id = '" + GlobalProperties.user_id + "'");

		if (headerRow.length > 0) {
			return headerRow[0]._id;
		}

		var subHeaderId = new UUID();
		var parentHeaderId = new UUID();

		this.masterRealm.write(() => {
			//create master header record
			this.masterRealm.create("Messages_Header_Record", {
				_id: parentHeaderId,
				user_id: GlobalProperties.user_id,
				type_id: type_id, 
				sub_header_id: subHeaderId,
				type: 0,
				title: name,  
				body: "",
				last_timestamp: new Date(0),
				read: true,
			});

			//create the sub header
			this.masterRealm.create("Messages_Sub_Header_Direct_Message_Record", 
			{
				_id: subHeaderId,
				parent_header_id: parentHeaderId,
				other_user_id: type_id,
				other_user_name: name,
				last_user_id: "",
				messages_records_size: 0,
				message_records: [],   
			});
		});

		return parentHeaderId;
	}

    //get direct message sub header
    async getDirectMessageInformation(id, read) {
		var subHeader = this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Direct_Message_Record", id);

		return subHeader;
    }

	//get direct message header row
	async getHeaderRow(id) {
		var header = this.masterRealm.objectForPrimaryKey("Messages_Header_Record", id);

		return header;
    }

	//create conversation
	//return parent header id
	async createConversation(type_id, name) {
		//check if already exists
		var headerRow = await this.masterRealm.objects("Messages_Header_Record").filtered("type_id = '" + type_id + "' AND type = 1 AND user_id = '" + GlobalProperties.user_id + "'");

		if (headerRow.length > 0) {
			return headerRow[0]._id;
		}

		var subHeaderId = new UUID();
		var parentHeaderId = new UUID();

		this.masterRealm.write(() => {
			//create master header record
			this.masterRealm.create("Messages_Header_Record", {
				_id: parentHeaderId,
				user_id: GlobalProperties.user_id,
				type_id: type_id, 
				sub_header_id: subHeaderId,
				type: 1,
				title: name,  
				body: "",
				last_timestamp: new Date(0),
				read: true,
			});

			//create the sub header
			this.masterRealm.create("Messages_Sub_Header_Conversation_Record", 
			{
				_id: subHeaderId,
				parent_header_id: parentHeaderId,
				conversation_id: type_id,
				last_user_id: "",
				messages_records_size: 0,
				message_records: [],   
			});
		});

		return parentHeaderId;
	}

    //get conversation sub header
    async getConversationInformation(id) {
		var subHeader = this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Conversation_Record", id);

		return subHeader;
    }

    //get invitation sub header
    async getInvitationInformation(id) {
		var subHeader = this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Invitation_Record", id);

		return subHeader;
    }

	async getAnnouncementInformation(id) {
		var subHeader = this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Announcement_Record", id);

		return subHeader;
	}

    //delete a header with it's contents
    async delete(_id) {
		//get header
		var headerRow = await this.masterRealm.objectForPrimaryKey("Messages_Header_Record", _id);

		//subheader
		var subHeader = null;

		//if it was found
		if (headerRow != null) {
			if (headerRow.type == 0) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Direct_Message_Record", headerRow.sub_header_id);

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});
			}
			else if (headerRow.type == 1) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Conversation_Record", headerRow.sub_header_id);

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});
			}
			else if (headerRow.type == 2) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Invitation_Record", headerRow.sub_header_id);

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});
			}
			else if (headerRow.type == 3) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Announcement_Record", headerRow.sub_header_id);

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});
			}

		}
    }

	async deleteAll() {
		this.masterRealm.write(() => {
			this.masterRealm.deleteAll();
		});
	}

	async getJsonContentAndDelete(_id) {
		//get header
		var headerRow = await this.masterRealm.objectForPrimaryKey("Messages_Header_Record", _id);

		//get headerRow json
		var masterJsonContent = headerRow.toJSON();

		//subheader
		var subHeader = null;

		//if it was found
		if (headerRow != null) {
			if (headerRow.type == 0) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Direct_Message_Record", headerRow.sub_header_id);

				var jsonContent = subHeader.toJSON()

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});

				return (
					{
						master: masterJsonContent,
						sub: jsonContent
					}
				);
			}
			else if (headerRow.type == 1) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Conversation_Record", headerRow.sub_header_id);

				var jsonContent = subHeader.toJSON()

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});

				return (
					{
						master: masterJsonContent,
						sub: jsonContent
					}
				);
			}
			else if (headerRow.type == 3) {
				//get the subHeader
				subHeader = await this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Announcement_Record", headerRow.sub_header_id);

				var jsonContent = subHeader.toJSON()

				//delete headers
				this.masterRealm.write(() => {
					this.masterRealm.delete(subHeader);
					this.masterRealm.delete(headerRow);
				});

				return (
					{
						master: masterJsonContent,
						sub: jsonContent
					}
				);
			}
		}

		return {};
	}
}