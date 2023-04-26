import { OpggCard, OpggNullCard, SummaryBox } from './opgg';
import { SovledDotAcCard, SovledDotAcNullCard } from './solvedDotAc';

const cards = [
  { Main: OpggCard, Null: OpggNullCard },
  { Main: SovledDotAcCard, Null: SovledDotAcNullCard },
  { Main: SummaryBox, Null: SovledDotAcNullCard },
];

export default cards;
