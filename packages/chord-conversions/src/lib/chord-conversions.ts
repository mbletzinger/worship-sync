import _, {forEach, toInteger} from 'lodash';
export const majorScaleIntervals = [
  2,2,1,2,2,2,1
];
export type AllHalfSteps = (
  'Cflat' | 'C' | 'Csharp' |
  'Dflat'| 'D' | 'Dsharp' |
  'Eflat' | 'E' | 'Esharp' |
  'Fflat' | 'F' | 'Fsharp' |
  'Gflat' | 'G' | 'Gsharp' |
  'Aflat' | 'A' | 'Asharp' |
  'Bflat' | 'B' | 'Bsharp'
  );
export type ChordNames = (
  'Major' | 'Minor' | 'Dimished' | 'Augmented' | 'Suspended' | 'Major7th' | 'Dominant7th' | 'Major6th'
  | 'MinorMajor7th' | 'Minor7th' | 'Minor6th' | 'Diminished7th' | 'HalfDiminished7th' | 'Diminished6th'
  | 'Major7thSharp5th' | 'Augmented7th' | 'Suspend7th'
);
export const Triads = {
  Major: ['1','3','5'],
  Minor: ['1','3flat','5'],
  Diminished: ['1','3flat','5flat'],
  Augmented: ['1','3','5sharp'],
  Suspended: ['1','4','5'],
}
export const FourNoteChords = {
  Major7th: ['1', '3', '5', '7'],
  Dominant7th: ['1', '3','5', '7flat'],
  Major6th: ['1', '3', '5', '6'],
  MinorMajor7th: ['1', '3flat', '5', '7'],
  Minor7th: ['1', '3flat', '5', '7flat'],
  Minor6th: ['1', '3flat', '5', '6'],
  Diminished7th: ['1','3flat','5flat', '7'],
  HalfDiminished7th: ['1','3flat','5flat', '7flat'],
  Diminished6th: ['1','3flat','5flat', '6'],
  Major7thSharp5th: ['1', '3', '5sharp', '7'],
  Augmented7th: ['1', '3', '5sharp', '7flat'],
  Suspend7th: ['1', '3', '5flat', '7flat']
}
export const chordSuffixes = {
  Major: null,
  Minor: 'm',
  Diminished: 'dim',
  Augmented: '+',
  Suspended: 'sus',
  Major7th: 'M7',
  Dominant7th: '7',
  Major6th: '6',
  MinorMajor7th: 'mM7',
  Minor7th: 'm7',
  Minor6th: 'm6',
  Diminished7th: 'dim7',
  HalfDiminished7th: 'o7',
  Diminished6th: 'dim6',
  Major7thSharp5th: 'm7#5',
  Augmented7th: '+7',
  Suspend7th: 'sus7'
};

export const sharpHalfSteps: AllHalfSteps[] = ['C', 'Csharp', 'D', 'Dsharp', 'E', 'F', 'Fsharp', 'G', 'Gsharp', 'A', 'Asharp', 'B']
export const flatHalfSteps: AllHalfSteps[] = ['C', 'Dflat', 'D', 'Eflat', 'E', 'F', 'Gflat', 'G', 'Aflat', 'A', 'Bflat', 'B']
const isFlat = (note: string) => _.includes(note, 'flat') || note === 'F';
export const getScale = (scale:AllHalfSteps) => {
  const halfSteps = isFlat(scale) ? flatHalfSteps : sharpHalfSteps;
  let adjustedScale: AllHalfSteps;
  switch(scale) {
    case 'Cflat':
      adjustedScale = 'B';
      break;
    case 'Fflat':
      adjustedScale = 'E';
      break;
    case 'Bsharp':
      adjustedScale = 'C';
      break;
    case 'Esharp':
      adjustedScale = 'F';
      break;
    default:
      adjustedScale = scale;
  }
  let index = halfSteps.indexOf(adjustedScale);
  const result : AllHalfSteps[] = [];
  majorScaleIntervals.forEach(i => {
    result.push(halfSteps[index]);
    index += i;
    index = index % halfSteps.length;
    // console.log(`index ${index} out of ${halfSteps.length}`);
  });
  result.push(scale);
  if(_.includes(result, 'F') && _.includes(result, 'Fsharp')) {
    result[_.indexOf(result,'F')] = 'Esharp';
  }
  if(_.includes(result, 'C') && _.includes(result, 'Csharp')) {
    result[_.indexOf(result,'C')] = 'Bsharp';
  }
  if(_.includes(result, 'B') && _.includes(result, 'Bflat')) {
    result[_.indexOf(result,'B')] = 'Cflat';
  }
  if(_.includes(result, 'E') && _.includes(result, 'Eflat')) {
    result[_.indexOf(result,'E')] = 'Fflat';
  }
  return result;
}
export const numbers2Letters = (numberChords: string [], scaleName: AllHalfSteps) : string [] => {
  const scale = getScale(scaleName);
  const numberRegex = /^(\d)/;
  return _.map(numberChords, numChord => {
    const numbers = numberRegex.exec(numChord);
    if(numbers !== null) {
      return numChord.replace(numberRegex, scale[toInteger(numbers[1]) - 1])
    }
    return numChord;
  });
}
