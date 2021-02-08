export const colors = ['#01651A',
'#3685B5',
'#FD9B9B',
'#C2F5FF',
'#D0D8DC']

export function randomColor(colors: string[]) {
  return colors[Math.floor(Math.random() * colors.length)];
}