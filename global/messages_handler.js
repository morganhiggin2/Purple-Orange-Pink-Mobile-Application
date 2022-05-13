/*import { GlobalProperties } from "./global_properties";
import Realm from "realm";
import { UIImagePickerControllerQualityType } from "expo-image-picker";

const { UUID } = Realm.BSON;

const types = ["direct_message", "conversation", "invitation", "announcement"]

const MAX_HEADER_LOAD_PER_PAGE = 20;
const MAX_MESSAGES_PER_CHAT_RECORD = 50
const MAX_NUM_MESSAGE_BLOCKS = 20;

//find way to make ids

const HeaderRecordSchema = {
    name: "HeaderRecord",
    properties: {
        _id: "int",
        type: "int", //index of type in types array
        body: "",
        //for types with data blocks
        start_index: "int",
        end_intex: "int"
    },
    primaryKey: "_id"
}

const ChatRecordSchema = {
    name: "ChatRecord",
    properties: {
        _id: "int",

    }
}*/

/*const MasterHeaderSchema = {
    name: "Messages_Master_Header",
    primaryKey: "_id",
    properties: {
        _id: "uuid",
        header_records: { type: "list", objectType: "Messages_Header_Record"}
    }
}

const HeaderRecordSchema = {
    name: "Messages_Header_Record",
    embedded: true,
    properties: {
        type: "int8", //index of type in types array
        title: "string", //for direct message, person who sent it. for conversation, conversation name. 
        body: "string", //body of message to be displayed in messages feed
        last_timestamp: { type: "int64", indexed: true},
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
        message_blocks: { type: "list", objectType: "Messages_Message_Block"}
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
        message_blocks: { type: "list", objectType: "Messages_Message_Block"}
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
const MessageBlock = {
    name: "Messages_Message_Block",
    embedded: true,
    properties: {
        messages: {type: "list", objectType: "Messages_Message_Record"}
    }
}

//message record
const MessageRecord = {
    name: "Messages_Message_Record",
    embedded: true,
    properties: {
        fromId: "string",
        message: "string"
    }
}

export class MessgaeHandler {
    masterHeaderRealm = null;
    masterHeader = null;

    constructor() {
        this.start = this.start.bind(this);
        this.loadMasterHeader = this.loadMasterHeader.bind(this);
    }

    async start() {
        this.masterHeaderRealm = await Realm.open({
            path: "friend_messages_realm_database",
            schemaVersion: 1.0,
            schema: [MasterHeaderSchema, HeaderRecordSchema, SubHeaderDirectMessageRecord, SubHeaderConversationRecord, SubHeaderInvitationRecord, SubHeaderAnnouncementRecord, MessageBlock, MessageRecord]
        });

        //if master record does not exist
        if (masterHeaderRealm.objects("Messages_Master_Header").length == 0) {
            //generate uuid
            var id = new UUID();

            this.masterHeaderRealm.create("Messages_Master_Header", 
                {
                    _id: id,
                    header_records: [],
                }
            );
        }

        this.masterHeader = masterHeaderRealm.objects("Messages_Master_Header")[0];
    }

    //json object
    async insertMessage(message) {
        
    }

    //json array
    async insertMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
            this.insertMessage(messages[i]);
        }
    }
}*/

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