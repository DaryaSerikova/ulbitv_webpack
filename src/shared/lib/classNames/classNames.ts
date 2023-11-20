type Mods = Record<string, boolean | string>

//Example
// const obj: Mods = {
//   'hovered': true,
//   'selectable': 'djfhjdfh',
// }

export function classNames(cls: string, mods: Mods, additional: string[]): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value)) //[key, value]
      .map(([className]) => className) //[key, value]
  ].join(' ')
}

// classNames('remove-btn', { hovered: true, selectable: true, red: true }, ['pdg']);
//'remove-btn hovered selectable pdg'