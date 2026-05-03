export const SCIENCE_CONSTANTS = {
  SPEED_OF_LIGHT_M_PER_S: 299_792_458,
  PLANCK_J_S: 6.626_070_15e-34,
  GRAVITATIONAL_CONSTANT_M3_PER_KG_S2: 6.674_30e-11,
  COULOMB_CONSTANT_N_M2_PER_C2: 8.987_551_792_3e9,
  GAS_CONSTANT_J_PER_MOL_K: 8.314_462_618_153_24,
  GAS_CONSTANT_L_ATM_PER_MOL_K: 0.082_057_366_080_960,
  FARADAY_C_PER_MOL: 96_485.332_12,
  WATER_PH_POH_SUM_AT_25C: 14,
} as const;

export const SCIENCE_CONSTANT_SOURCES = {
  SPEED_OF_LIGHT_M_PER_S: "NIST CODATA exact value for c",
  PLANCK_J_S: "NIST CODATA exact value for h (SI redefinition)",
  GRAVITATIONAL_CONSTANT_M3_PER_KG_S2: "NIST CODATA 2018 recommended value for G",
  COULOMB_CONSTANT_N_M2_PER_C2: "Derived from CODATA electric constant relation (rounded)",
  GAS_CONSTANT_J_PER_MOL_K: "NIST CODATA recommended value for R",
  GAS_CONSTANT_L_ATM_PER_MOL_K: "CRC/NIST derived conversion of R into L*atm units",
  FARADAY_C_PER_MOL: "NIST CODATA recommended value for Faraday constant",
  WATER_PH_POH_SUM_AT_25C: "General chemistry relation at 25 C (Kw = 1e-14)",
} as const;

