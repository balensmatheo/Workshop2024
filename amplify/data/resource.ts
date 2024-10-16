import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
    title: a.string(),
    description: a.string(),
    isDone: a.boolean(),
    isDaily: a.boolean(),
    isWeekly: a.boolean(),
    isMonthly: a.boolean(),
    points: a.integer()
  })
      .authorization(allow => [allow.owner()]),

  User: a.model({
    username: a.string(), // Ajout d'un champ pour le nom d'utilisateur, qui doit être unique
    points: a.integer()       // Champ pour le nombre de points
  })
      .authorization(allow => [allow.owner()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});
