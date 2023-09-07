import { IconifyJSON } from '@iconify-json/material-symbols';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: [],
  theme: {},
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
