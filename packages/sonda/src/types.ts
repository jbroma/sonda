import type { EncodedSourceMap } from '@ampproject/remapping';

export interface Options {
  /**
   * Output format of the report.
   *
   * @default 'html'
   */
  format: 'html' | 'json';

  /**
   * Whether to open the generated report in the default program for HTML files.
   *
   * @default true
   */
  open: boolean;
}

export interface ReportInput {
  bytes: number;
  format: ModuleFormat;
  imports: ReadonlyArray<string>;
  belongsTo: string | null;
}

export interface ReportOutput extends Sizes {
  inputs: Record<string, ReportOutputInput>;
}

export interface ReportOutputInput extends Sizes {}

export interface JsonReport {
  inputs: Record<string, ReportInput>;
  outputs: Record<string, ReportOutput>;
}

export interface Sizes {
  uncompressed: number;
  gzip: number;
  brotli: number;
}

export interface CodeMap {
  code: string;
  map?: EncodedSourceMap;
}

export type ModuleFormat = 'esm' | 'cjs' | 'unknown';
export type MaybeCodeMap = CodeMap | null;
