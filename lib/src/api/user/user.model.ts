
import { Node, NodeOptions } from "@tom2a/core/decorator/node.decorator";

@Node ({
  NodeOptions: {
    labels: ["SYSTEM", "USER"],
    type: UserModel.name
  }
})
export class UserModel {
  public name: string;
  public admin: boolean;
}
