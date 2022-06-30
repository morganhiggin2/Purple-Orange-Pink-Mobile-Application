import { GlobalProperties } from "./global_properties";
import 'react-native-get-random-values';
import Realm from "realm";
import { UIImagePickerControllerQualityType } from "expo-image-picker";
import 'react-native-get-random-values';
import { Alert } from "react-native";

const { UUID } = Realm.BSON;

const types = ["direct", "conversation", "invitation", "announcement"]

const MAX_HEADER_LOAD_PER_PAGE = 20;
const MAX_MESSAGES_PER_CHAT_RECORD = 50
const MAX_NUM_MESSAGE_BLOCKS = 20;
const MAX_NUM_MESSAGES = 100;

const HeaderRecordSchema = {
    name: "Messages_Header_Record",
	primaryKey: "_id",
    properties: {
		_id: "uuid",
        type: "int", //index of type in types array
        title: "string", //for direct message, person who sent it. for conversation, conversation name. 
        body: "string", //body of message to be displayed in messages feed
        last_timestamp: { type: "date", indexed: true},
        type_id: "string", //id of type, [conversation is conversation id, direct message is other user id, invitation is invitation id, none for announcemnet]
        sub_header_id: "uuid"
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
        user_ids_to_names: "string{}", //user ids to user names (first and last initialed names)
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
        invitation_from_name: "string",
        invitation_message: "string",
    }
}

//type announcement
const SubHeaderAnnouncementRecord = {
    name: "Messages_Sub_Header_Announcements_Record",
    primaryKey: "_id",
    properties: {
        _id: "uuid",
        parent_header_id: "uuid",
        activity_id: "string",
    }
}

//message block of MAX_MESSAGES_PER_CHAT_RECORD messages
/*const MessageBlock = {
    name: "Messages_Message_Block",
    embedded: true,
    properties: {
        messages: {type: "list", objectType: "Messages_Message_Record"}
    }
}*/

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

export class MessageHandler {
    constructor() {
        
        this.masterRealm = null;
        this.masterHeader = null;
		this.open = false;
          
        this.start = this.start.bind(this);
        this.insertMessage = this.insertMessage.bind(this);
        this.delete = this.delete.bind(this);
        this.getConversationInformation = this.getConversationInformation.bind(this);
        this.getDirectMessageInformation = this.getDirectMessageInformation.bind(this);
        this.getInvitationInformation = this.getInvitationInformation.bind(this);
        this.getNextMessageBlockConverstaion = this.getNextMessageBlockConverstaion.bind(this);
        this.getNextMessageBlockDirectMessage = this.getNextMessageBlockDirectMessage.bind(this);
        this.insertMessages = this.insertMessages.bind(this);
    }

	async openRealm() {
		if (!this.open) {
			this.masterRealm = await Realm.open({
				path: "friend_messages_realm_database",
				schemaVersion: 1.0,
				schema: [HeaderRecordSchema, SubHeaderDirectMessageRecord, SubHeaderConversationRecord, SubHeaderInvitationRecord, SubHeaderAnnouncementRecord, MessageRecord],
				deleteRealmIfMigrationNeeded: true
			  });

			this.open = true;
		}
	}

	closeRealm() {
		this.open = false;

		this.masterRealm.close();
	}

    async start() {

        //if master record does not exist
        /*if (this.masterRealm.objects("Messages_Master_Header").length == 0) {
          this.masterRealm.write(() => {
            //generate uuid
            var id = new UUID();

            this.masterRealm.create("Messages_Master_Header", 
                {
                    _id: id,
                    header_records: [],
                }
            );
          });
        }*/

        //this.masterHeader = this.masterRealm.objects("Messages_Header_Record");
    }

    //json object
    async insertMessage(message) {
        //make query to find it if it exists
        /*const query = {"Messages_Header_Record": {"type_id" : message.id, "type" : message.type}};
        const projection = {
            "type": message.type,
            "type_id": message.id,
        };

        var found;

        const headerRow = await this.masterHeader.headerRecords.findOne(query)
            .then((result) => {
                //found
                found = true;
                return result;
            })
            .catch((err) => {
                //not found
                found = false;
                return err;
            });*/

		var found = false;
		var headerRow = null;

		if (message.type == "direct") { 

			//findfirstasync?
			//get other user id
			headerRow = await this.masterRealm.objects("Messages_Header_Record").filtered("type_id = '" + message.other_user_id + "' AND type = 0");

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

					headerRow.last_timestamp = new Date(parseInt(message.timestamp));

					var show_name = true;

					if (subHeader.messages_records_size > 0) {
						//get previous message's user id
						var prevUserId = subHeader.message_records[0].from_id;

						show_name = prevUserId != message.other_user_id;
					}

					subHeader.message_records.unshift({
						from_id: message.other_user_id,
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
						type_id: message.other_user_id, 
						sub_header_id: subHeaderId,
						type: 0,
						title: message.user_name,  
						body: message.body,
						last_timestamp: new Date(parseInt(message.timestamp))
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

					/*
					//add message block to sub header
					subHeader.message_blocks.push(
						{
							messages: [],
						});

					//increment last_index
					subHeader.last_index++;

					//get the index of the most recent message block
					var index = subHeader.last_index - 1;

					//get message block
					var message_block = subHeader.message_blocks[index];

					//add to message_block
					message_block.push({
						from_id: message.other_user_id,
						id: message_block.length, //has to be unique for the flat list to render
						message: message.body,
						show_name: true
					});*/

					subHeader.message_records.push({
						from_id: message.other_user_id,
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
			//get converation id
			headerRow = await this.masterHeader.filtered("type_id = '" + message.conversation_id + "' AND type = 1");
		}
		else if (message.type == "invitation") {
			//although invitations cannot be new, they may be able to have status updates
			//so we will this option open to find them
			//headerRow = await this.masterHeader.filtered("type_id = '" + message.invitation_id + "' AND type = 2");
		}
		else if (message.type == "announcement") {
			//all announcements are new, so no need to look for old ones
			//headerRow = await this.masterHeader.filtered("type_id = '" + message.announcement_id + "' AND type = 3");
		}
		else {
			return;
		}

        //if it exists
        if (found) {
            if (message.type == "direct message") {
                
            }
            else if (message.type == "conversation") {
                //write
                  //change title
                  //change body
                  //change time stamp

                //get sub header id
                  //update other users names if they changed
                  //get first message container in list
                    //if full
                      //add new one to front with new message
                    //else
                      //add message with properties to front of existing one
            }
            else if (message.type == "announcement") {
                //delete current announcement

                //create new one
            }
            else if (message.type == "invitation") {
                //delete current invitation

                //create new one
            }
        }
        else {
            if (message.type == "direct message") {
                //create header record
                  //set title
                  //set body
                  //set last timestamp
              
                //create sub header
                  //set parent header id
                  //set other user's id
                  //set other user's name
                  //set last user id to 0
                  //set last index to 0
                  //initialize empty message blocks

                //create sub header record

                //set sub header id in header record
                
                //create first message block

                //add message block to sub header
                
                //create message record
                  //add message
                  //set show me
                  //set last index

                //in sub header, set last user id
                //in sub header, incremenet last index by 1

                //add message to front of message block
            }
            else if (message.type == "conversation") {
              //ask server for all conversation person's ids and names  
              
              //create header record
                //set title
                //set body
                //set last timestamp

              //create sub header
                //set parent header id
                //set other users ids and names to dictionary
                //set last user id to 0
                //set last index to 0
                //initialize empty message blocks

              //create sub header record

              //set sub header id in header record
              
              //create first message block

              //add message block to sub header
              
              //create message record
                //add message

              //in sub header, set last user id
              //in sub header, incremenet last index by 1

              //add message to front of message block
            }
            else if (message.type == "announcement") {
              //create sub header
                //set parent header id
                //set announcement from name
                //set announcement message 

              //create header record
                //set title
                //set body
                //set last timestamp

              //set sub header id in header record
            }
            else if (message.type == "invitation") {
              //create sub header
                //set parent header id
                //set invitation id
                //set invitation from name
                //set invitation message

              //create header record
                //set title
                //set body
                //set last timestamp

              //set sub header id in header record
            }
        }

        //get the header component if it exists

        //if it does not, create it
          //and it's sub components
        
        //else
          //change header component
          //change sub components as needed
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
		/*this.masterRealm.write(() => {
			this.masterRealm.deleteAll();
		});*/
		var messageHeaders = await this.masterRealm.objects("Messages_Header_Record").sorted('last_timestamp', true);

		return messageHeaders;
	}

    //messages screen already go on masterheader, since they are always linked
    //so just call messages to be reloaded and it will auto update after insertion

    //get direct message sub header
    async getDirectMessageInformation(id) {
		var subHeader = this.masterRealm.objectForPrimaryKey("Messages_Sub_Header_Direct_Message_Record", id);

		return subHeader;

        //find and get sub header

        //if does not exist
          //delete corresponding record header
          //queue messages screen to releod to refresh deletion
          //send bad request to signal messages page to abandon and go back
        
        //query for first message block in sub header

        //else
          //get first message block of information
          //and other information
          //return sub header
    }

    async getNextMessageBlockDirectMessage(id, num, subHeader) {
        //get next message block from subHeader
    }

    //get conversation sub header
    async getConversationInformation(id) {
        const type = "invitation";

        //find and get sub header

        //if does not exist
          //delete corresponding record header
          //queue messages screen to releod to refresh deletion
          //send bad request to signal messages page to abandon and go back
        
        //query for first message block in sub header

        //else
          //get first message block of information
          //and other information
          //return sub header
    }

    async getNextMessageBlockConverstaion(id, num, subHeader) {
        //get next message block from subHeader
    }

    //get invitation sub header
    async getInvitationInformation(id) {
        const type = "invitation";

        //query for first one
        
        //if does not exist
          //delete header record
          //queue messages screen to releod to refresh deletion
          //send bad request to signal messages page to abandon and go back

        //else, send back relevant information
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

		}

		/*
		if (message.type == "direct message") {
		//get sub header
		//delete sub header
		//delete record header
		}
		else if (message.type == "conversation") {
		//get sub header
		//delete sub header
		//delete record header
		}
		else if (message.type == "announcement") {
		//get sub header
		//delete sub header
		//delete record header
		}
		else if (message.type == "invitation") {
		//get sub header
		//delete sub header
		//delete record header
		}*/
    }
}

//PROBLEM making primary keys

//get header (from message page startup)

//get direct messageing
  //get sub header
  //gets first message block

//get conversation
  //get sub header
  //gets first message block 

//send message
  //savetomessgaeblock()

//savetomessageblock()
  //if message block is too big by MAX_MESSAGES_PER_CHAT_RECORD
    //create new message block
    //add message to new message block
    //add to front of list
    //if too many message blocks by MAX_NUM_MESSAGE_BLOCKS
      //remove last message block in list
  //add to current message block

//addincomingmessages
  ////adds all incoming messages in order of oldest to newest

  //updates header body and lastTimeStamp with new ones
  //check if name changed per the id, if it did, update name (if direct) or dictionary (if conversation)

////once incoming messages are added, get new ones to update and their values
//pull new headers


//---local class that manages the header and messages

//new message 
 //adds or moves and changes block in header, updates values as well
 //adds to or makes new chat block (if chat)

 //use realm to manage, its faster and supports json

 //UUID https://www.mongodb.com/docs/realm/sdk/node/data-types/uuid/