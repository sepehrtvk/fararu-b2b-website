import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { theme } from "./theme";

// Create rtl cache
const cacheRtl = createCache({
  key: "mxr",
  stylisPlugins: [prefixer, rtlPlugin],
});

function ThemeProviderApp({ children }: any) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
export default ThemeProviderApp;
