"use client"

import { useTodo } from "./todo-context"
import { TodoItem } from "./todo-item"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

export function TodoList() {
  const { state, dispatch } = useTodo()

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "completed") return todo.completed
    if (state.filter === "pending") return !todo.completed
    return true
  })

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(filteredTodos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update the full todos array maintaining the filter
    const newTodos = [...state.todos]
    const filteredIds = items.map((item) => item.id)

    // Reorder only the filtered items in the original array
    filteredTodos.forEach((todo, index) => {
      const originalIndex = newTodos.findIndex((t) => t.id === todo.id)
      const newItem = items[index]
      if (originalIndex !== -1) {
        newTodos[originalIndex] = newItem
      }
    })

    dispatch({ type: "REORDER_TODOS", payload: newTodos })
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌌</div>
        <p className="text-white/60 text-lg">
          {state.filter === "completed"
            ? "No completed missions yet. Start exploring!"
            : state.filter === "pending"
              ? "No active missions. Time to launch something new!"
              : "Your cosmic journey begins here. Add your first mission!"}
        </p>
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                      transition-transform duration-200
                      ${snapshot.isDragging ? "rotate-2 scale-105" : ""}
                    `}
                  >
                    <TodoItem todo={todo} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
