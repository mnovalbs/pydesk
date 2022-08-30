import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  FluentProvider,
  makeStyles,
  teamsLightTheme,
} from '@fluentui/react-components';
import Home from './pages/Home';
import './App.css';

const useStyles = makeStyles({
  main: {
    maxWidth: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={classes.main}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </FluentProvider>
  );
}
