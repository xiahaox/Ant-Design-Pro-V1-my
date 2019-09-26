import dva from 'dva';
import './index.css';
import a from './models/example1'

import createLoading from 'dva-loading';
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
app.model(require('./models/global').default);

app.model(a)
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
