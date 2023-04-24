import { OpggCard, OpggNullCard, SummaryBox, SummaryBox1 } from './opgg';
import { SovledDotAcCard, SovledDotAcNullCard } from './solvedDotAc';

const cards = [
  { Main: OpggCard, Null: OpggNullCard },
  { Main: SovledDotAcCard, Null: SovledDotAcNullCard },
  { Main: SummaryBox, Null: SovledDotAcNullCard },
  { Main: SummaryBox1, Null: SovledDotAcNullCard },
];

export default cards;
