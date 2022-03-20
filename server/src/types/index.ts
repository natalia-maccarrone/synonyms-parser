export type SynonymResponse = {
  word: string;
  synonyms_found: number;
};

export type WordNetResponse = {
  synsetOffset: number;
  lexFilenum: number;
  pos: string;
  wCnt: number;
  lemma: string;
  synonyms: [string];
  lexId: string;
  ptrs: [Ptrs];
  gloss: string;
  def: string;
  exp: [string];
};

export type Ptrs = {
  pointerSymbol: string;
  synsetOffset: number;
  pos: string;
  sourceTarget: string;
};
