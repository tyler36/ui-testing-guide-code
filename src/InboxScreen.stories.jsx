import { http, HttpResponse } from 'msw'
import InboxScreen from './InboxScreen'
import { Default as TaskListDefault } from './components/TaskList.stories'

export default {
  component: InboxScreen,
  title: 'InboxScreen',
}

export const Default = {
  parameters: {
    msw: {
      handlers: [http.get('/tasks', () => HttpResponse.json(TaskListDefault.args))],
    },
  },
}

export const Error = {
  args: {
    error: 'Something',
  },
  parameters: {
    msw: {
      handlers: [http.get('/tasks', () => HttpResponse.json([]))],
    },
  },
}
