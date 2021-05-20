import {
  BatchWriteItemCommand,
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

const dyDbClient = (credentials) => {
  const {
    accessKeyId,
    secretAccessKey,
    expiration,
    sessionToken,
  } = credentials;
  return new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId,
      expiration,
      secretAccessKey,
      sessionToken,
    },
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/modules/credentials.html
  });
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/interfaces/dynamodbclientconfig.html
};

const dydbModule = {
  namespaced: true,
  state() {
    return {
      items: [],
    };
  },
  actions: {
    async getItems({ commit, rootGetters }) {
      const client = dyDbClient(rootGetters["authModule/credentials"].response);
      const params = {
        /** input parameters */
        TableName: "students",
      };
      const command = new ScanCommand(params);
      try {
        const data = await client.send(command);
        commit("setItems", data);
        console.log(data);
      } catch (error) {
        // error handling.
        console.log(error);
      }
    },
    async addItem({ rootGetters }, payload) {
      const client = dyDbClient(rootGetters["authModule/credentials"].response);
      const params = {
        RequestItems: {
          students: [
            {
              PutRequest: {
                Item: {
                  lastName: {
                    S: payload.lastName,
                  },
                  firstName: {
                    S: payload.firstName,
                  },
                },
              },
            },
          ],
        },
      };
      const command = new BatchWriteItemCommand(params);
      try {
        const data = await client.send(command);
        console.log(data);
      } catch (error) {
        // error handling.
        console.log(error);
      }
    },
  },
  mutations: {
    setItems(state, payload) {
      state.items = payload.Items;
    },
  },
  getters: {
    items({ items }) {
      console.log(items);
      return items;
    },
  },
};

export default dydbModule;

// References:

// Getting started guide for using the client
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html