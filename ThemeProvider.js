import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some css that access to theme
  }
});

function App(props) {
  //   const classes = useStyles(); // ❌ If you have this, consider moving it inside a component that wrapped with <ThemeProvider>
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
