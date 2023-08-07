import {getScale, numbers2Letters} from './chord-conversions';

describe('chordConversions', () => {
  describe('getScale', () => {
    it('should generate sharp scales', () => {
      let actual = getScale('C');
      expect(actual).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
      actual = getScale('D');
      expect(actual).toEqual(['D', 'E', 'Fsharp', 'G', 'A', 'B', 'Csharp', 'D']);
      actual = getScale('G');
      expect(actual).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'Fsharp', 'G']);
      actual = getScale('A');
      expect(actual).toEqual(['A', 'B', 'Csharp', 'D', 'E', 'Fsharp', 'Gsharp', 'A']);
      actual = getScale('B');
      expect(actual).toEqual(['B', 'Csharp', 'Dsharp', 'E', 'Fsharp', 'Gsharp', 'Asharp', 'B']);
    });
    it('should generate flat scales', () => {
      let actual = getScale('Bflat');
      expect(actual).toEqual(['Bflat', 'C', 'D', 'Eflat', 'F', 'G', 'A', 'Bflat']);
      actual = getScale('F');
      expect(actual).toEqual(['F', 'G', 'A', 'Bflat', 'C', 'D', 'E', 'F']);
      actual = getScale('Eflat');
      expect(actual).toEqual(['Eflat', 'F', 'G', 'Aflat', 'Bflat', 'C', 'D', 'Eflat']);
      actual = getScale('Dflat');
      expect(actual).toEqual(['Dflat', 'Eflat', 'F', 'Gflat', 'Aflat', 'Bflat', 'C', 'Dflat']);
      actual = getScale('Aflat');
      expect(actual).toEqual(['Aflat', 'Bflat', 'C', 'Dflat', 'Eflat', 'F', 'G', 'Aflat']);
    });
    it('should generate complex sharp scales', () => {
      const actual = getScale('Csharp');
      expect(actual).toEqual(['Csharp', 'Dsharp', 'Esharp', 'Fsharp', 'Gsharp', 'Asharp', 'Bsharp', 'Csharp']);
    });
    it('should generate complex flat scales', () => {
      const actual = getScale('Cflat');
      expect(actual).toEqual(['Cflat','Dflat', 'Eflat', 'Fflat', 'Gflat', 'Aflat', 'Bflat', 'Cflat']);
    });
  });
  describe('numbers2Letters', () => {
    it('should handle triad chords', () => {
        const numberChords = ['2', '3m', '4dim', '5+', '6sus'];
        const actual = numbers2Letters(numberChords, 'A');
        expect(actual).toEqual(['B','Csharpm','Ddim','E+','Fsharpsus']);
    });
    it('should handle four note chords', () => {
      const numberChords = ['7M7','77', '76', '1mM7', '1m7', '2m6', '2dim7', '3o7', '3dim6', '4m7#5', '4+7', '5sus7'];
      const actual = numbers2Letters(numberChords, 'G');
      expect(actual).toEqual([  'FsharpM7', 'Fsharp7', 'Fsharp6', 'GmM7', 'Gm7', 'Am6', 'Adim7', 'Bo7',
        'Bdim6', 'Cm7#5', 'C+7', 'Dsus7']);
    });
    it('should pass through mis-formatted chord notations', () => {
      const numberChords = ['7', '1m', '2dim', '3+', 'Oops', '4sus'];
      const actual = numbers2Letters(numberChords, 'G');
      expect(actual).toEqual(['Fsharp','Gm','Adim','B+','Oops', 'Csus']);
    });

  });
});
