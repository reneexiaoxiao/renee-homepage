export const VALUES = [
  {id:0,title:'话语、语气与欣赏'},
  {id:1,title:'时间、关注与陪伴'},
  {id:2,title:'触碰、温暖与身体上的亲近'},
  {id:3,title:'实际照顾与帮助'},
  {id:4,title:'用心的举动、礼物与被记住的细节'},
  {id:5,title:'清晰、承诺与可靠'},
  {id:6,title:'信任、自由与空间'},
  {id:7,title:'玩心、喜悦与生命力'},
  {id:8,title:'成长、真实、共同的意义与方向'},
  {id:9,title:'相互付出与公平'},
  {id:10,title:'温柔对待脆弱与安定人心的陪伴'},
] as const;
export function moveItem(items: number[], id: number, target: number): number[] {
  const from = items.indexOf(id);
  if (from < 0 || target < 0 || target >= items.length || from === target) return items;
  const next = [...items]; next.splice(from,1); next.splice(target,0,id); return next;
}
