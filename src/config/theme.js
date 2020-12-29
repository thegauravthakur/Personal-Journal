import { deepPurple } from "@material-ui/core/colors";
import { responsiveFontSizes } from "@material-ui/core";

const { createMuiTheme } = require("@material-ui/core");
let theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
  overrides: {
    MuiTimelineItem: {
      missingOppositeContent: {
        "&:before": {
          display: "none",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
