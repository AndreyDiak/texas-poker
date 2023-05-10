const names: string[] = [
   'Adam',
   'Oliver',
   'Andrew',
   'Ashley',
   'Chad',
   'Dwight',
   'Eric',
   'Harry',
   'Jim',
   'Jessy',
   'Juliana',
   'Kate',
   'Mick',
   'Oscar',
   'Scott',
   'Shayne',
   'Tyler',
   'Wayne',
   'Walter',
   'Elizabeth',
   'Tanya'
];

export function createName() {
   const index = Math.floor(Math.random() * names.length);
   return names[index]
}
