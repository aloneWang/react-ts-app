
// type C<T, K extends keyof T> = {
//   [key in k]: T[key]

import { type } from "os";

// }
// interface Dog {
//   name: string;
//   year: number;
// }

// interface Map<T> {
//   [key: string]: T;
// }
// interface identity<T> {
//   add: (x:T,y:T )=> T
//   // add(x:T, y: T) :T
// }
// let obj: identity<number> = {
//   add(x, y) {
//     return x+y
//   }
// }
// obj.add(1,2)
// interface C extends  Map<number> {
//   name: 1
// }
// let keys: keyof Map<number>; // string
// let keys1: keyof C
// let value: Map<number>[0]; // number
// let b: Map<number>['0']


// interface BeeKeeper<T  extends  Dog>{
//   title: string;
//   size: keyof T
// }
// interface Animal {
//   title: string;
//   name: string;
//   year: number;
// }
// let Bee: BeeKeeper<Animal> = {
//   title: 'sdsd',
//   size: 'year' || 'name' || 'year'
// }
// function loggingIdentity<T>(arg:T):T {
//   return arg
// }
// loggingIdentity('2')


// class BeeKeeper {
//   hasMask: boolean;
// }

// class ZooKeeper {
//   nametag: string;
// }

// class Animal {
//   numLegs: number;
// }

// class Bee extends Animal {
//   keeper: BeeKeeper;
// }

// class Lion extends Animal {
//   keeper: ZooKeeper;
// }

// function createInstance<A extends Animal>(c: new () => A): A {
//   return new c();
// }

// createInstance(Lion).keeper.nametag;  // typechecks!
// createInstance(Bee).keeper.hasMask;   // typechecks!

