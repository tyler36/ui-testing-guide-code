import { http, HttpResponse } from 'msw'
import InboxScreen from './InboxScreen'
import { Default as TaskListDefault } from './components/TaskList.stories'
import { expect, userEvent, findByRole, within } from '@storybook/test'

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

export const PinTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const getTask = (id) => canvas.findByRole('listitem', { name: id })
    const itemToPin = await getTask('task-4')

    // Find the pin button
    const pinButton = await findByRole(itemToPin, 'button', { name: 'pin' })

    // Click button
    await userEvent.click(pinButton)

    // Check that the pin button is now an unpin button
    const unpinButton = within(itemToPin).getByRole('button', { name: 'unpin' })
    await expect(unpinButton).toBeInTheDocument()
  },
}

export const ArchiveTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const getTask = (id) => canvas.findByRole('listitem', { name: id })

    const itemToArchive = await getTask('task-2')
    const archiveButton = await findByRole(itemToArchive, 'button', {
      name: 'archiveButton-2',
    })

    await userEvent.click(archiveButton)
  },
}

export const EditTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const getTask = (id) => canvas.findByRole('listitem', { name: id })

    const itemToEdit = await getTask('task-5')
    const taskInput = await findByRole(itemToEdit, 'textbox')
    await userEvent.type(taskInput, ' and disable state')
    await expect(taskInput.value).toBe('Fix bug in input error state and disable state')
  },
}

export const DeleteTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async({canvasElement}) => {
    const canvas = within(canvasElement)
    const getTask = (id) => canvas.findByRole('listitem', { name: id })

    const itemToDelete = await getTask('task-1')
    const deleteButton = await findByRole(itemToDelete, 'button', {
      name: 'delete',
    })

    await expect(canvas.getAllByRole('listitem').length).toBe(6)
    await userEvent.click(deleteButton)
    await expect(canvas.getAllByRole('listitem').length).toBe(5)
  }
}
