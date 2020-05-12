
import { Node } from "@tom2a/core/decorator/node.decorator";

import { BaseModelModule } from "@tom2a/core/";

@Node ({
  nodeMeta: {
    labels: ["SYSTEM", "USER"],
    type: UserModel.name
  }
})
export class UserModel extends BaseModelModule {
  public name: string;
  public admin: boolean;
}
