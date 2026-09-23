import { normalizarPreferencias, PADRAO } from './config.service';
describe('Preferências', () => {
  it('uses defaults when a profile has no preferences', () => {
    expect(normalizarPreferencias({})).toEqual(PADRAO);
  });
  it('clamps unsupported voice values and rejects invalid sizes', () => {
    expect(normalizarPreferencias({ rate: 30, pitch: -1, pictogramSize: 'unknown' as any }))
      .toEqual({ rate: 2, pitch: .5, pictogramSize: 'medio' });
    expect(normalizarPreferencias({ rate: NaN, pitch: Infinity })).toEqual(PADRAO);
  });
  it('preserves valid user preferences', () => {
    const chosen = { rate: .8, pitch: 1.4, pictogramSize: 'grande' as const };
    expect(normalizarPreferencias(chosen)).toEqual(chosen);
  });
});
