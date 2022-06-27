import { GlobalProperties } from "./global_properties";
import Realm from "realm";
import { UIImagePickerControllerQualityType } from "expo-image-picker";
import 'react-native-get-random-values';

const { UUID } = Realm.BSON;

const types = ["direct_message", "conversation", "invitation", "announcement"]

const MAX_HEADER_LOAD_PER_PAGE = 20;
const MAX_MESSAGES_PER_CHAT_RECORD = 50
const MAX_NUM_MESSAGE_BLOCKS = 20;

//find way to make ids
const MasterHeaderSchema = {
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
        last_index: "int", //for assigning unique and incremental id
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
        last_user_id: "string", //last user for message of conversation, can be current user, for show_me
        last_index: "int", //for assigning unique and incremental id
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
        id: "int", //has to be unique for the flat list to render
        message: "string",
        showName: "bool", //wether to show name, based on if the last message is from the same person or not
    }
}

export class MessageHandler {
    masterHeaderRealm = null;
    masterHeader = null;

    constructor() {
        this.start = this.start.bind(this);
        this.insertMessage = this.insertMessage.bind(this);
        this.delete = this.delete.bind(this);
        this.getConversationInformation = this.getConversationInformation.bind(this);
        this.getDirectMessageInformation = this.getConversationInformation.bind(this);
        this.getInvitationInformation = this.getInvitationInformation.bind(this);
        this.getNextMessageBlockConverstaion = this.getNextMessageBlockConverstaion.bind(this);
        this.getNextMessageBlockDirectMessage = this.getNextMessageBlockDirectMessage.bind(this);
        this.insertMessages = this.insertMessages.bind(this);
    }

    async start() {
        this.masterHeaderRealm = await Realm.open({
            path: "friend_messages_realm_database",
            schemaVersion: 1.0,
            schema: [MasterHeaderSchema, HeaderRecordSchema, SubHeaderDirectMessageRecord, SubHeaderConversationRecord, SubHeaderInvitationRecord, SubHeaderAnnouncementRecord, MessageBlock, MessageRecord]
        });

        //if master record does not exist
        if (this.masterHeaderRealm.objects("Messages_Master_Header").length == 0) {
          this.masterHeaderRealm.write(() => {
            //generate uuid
            var id = new UUID();

            this.masterHeaderRealm.create("Messages_Master_Header", 
                {
                    _id: id,
                    header_records: [],
                }
            );
          });
        }

        this.masterHeader = this.masterHeaderRealm.objects("Messages_Master_Header");
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

        var headerRow = await this.masterHeader.header_records.filtered("type_id = " + message.id + ", type = " + message.type);

        console.log(headerRow);
        return;

        //if it exists
        if (found) {
            if (message.type == "direct message") {
                //write
                  //change title
                  //change body
                  //change time stamp

                //get sub header id
                  //update other user name if it changed
                  //get first message container in list
                    //if full
                      //add new one to front with new message
                      //increment index
                    //else
                      //add message with properties to front of existing one
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

        this.masterHeaderRealm.write(() => {
            
        });

        //get the header component if it exists

        //if it does not, create it
          //and it's sub components
        
        //else
          //change header component
          //change sub components as needed
    }

    //json array
    async insertMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
            this.insertMessage(messages[i]);
        }
    }

    //messages screen already go on masterheader, since they are always linked
    //so just call messages to be reloaded and it will auto update after insertion

    //get direct message sub header
    async getDirectMessageInformation(id) {
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

    //delete a message
    async delete(id) {
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
      }
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