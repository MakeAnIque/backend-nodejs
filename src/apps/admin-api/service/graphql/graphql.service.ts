import { graphqlHTTP } from 'express-graphql';
import {
  ID,
  buildSchema,
  Field,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

/**
 * For Default Schema
 */

@ObjectType()
class Recipe {
  @Field((type) => ID)
  id!: string;
}

@Resolver(Recipe)
class RecipeResolver {
  constructor() {}

  @Query((returns) => Recipe)
  async recipe() {
    return {
      id: 1,
    };
  }
}

export class GraphqlAppService {
  public static readonly schemaSet: Array<typeof Resolver> = [];

  public static addSchema(schema: typeof Resolver) {
    this.schemaSet.push(schema);
  }

  private static async getSchema() {
    return await buildSchema({
      resolvers: [RecipeResolver, ...this.schemaSet],
    });
  }

  public static async getGraphQlHttp() {
    return graphqlHTTP({
      schema: await this.getSchema(),
      graphiql: true,
    });
  }
}
