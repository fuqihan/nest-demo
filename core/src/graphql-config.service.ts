import { Inject, Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { join } from "path";
import { AuthService } from "./auth/auth.service";
import { Jwt } from '../../common/utils/jwt';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(@Inject(AuthService) private readonly clentServe: AuthService) {}

  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: [join(process.cwd(), "../common/graphqls/*.graphql")],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), "src/graphql.schema.ts"),
        outputAs: "class"
      },
      context: async ({ req }) => {
        const isInit = this.clentServe.Init();
        if (!isInit)
          return {
            isInit: false
          };
        let user = Jwt.verifyToken(req.headers.authorization);
        return { user, isInit: true };
      }
    };
  }
}
