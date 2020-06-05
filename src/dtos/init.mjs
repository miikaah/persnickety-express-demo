import Foo from "./Foo.mjs";
import Product from "./Product.mjs";
import { Model } from "persnickety";

export default function initDtos() {
  Model(Product);
  Model(Foo);
}
