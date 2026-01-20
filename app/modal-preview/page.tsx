// //Редагування завдання (AddTask)

'use client';

import { useState } from 'react';
import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';
import { Task } from '@/types/task';

export default function ModalPreviewPage() {
  const [isOpen, setIsOpen] = useState(true);

  // 🔹 Фейковая задача для режиму редагування
  const mockTask: Task = {
    id: 'test-task-id',
    // title: 'Купити молоко',
    name: 'Без лактози',
    isDone: false,
    date: '2026-01-15T00:00:00.000Z',
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Modal preview — Edit task</h1>

      <button onClick={() => setIsOpen(true)}>Відкрити модалку</button>

      <AddTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        taskToEdit={mockTask} // ✅ ВАЖНО: саме це вмикає "Редагувати завдання"
      />
    </div>
  );
}

// Нове завдання

// 'use client';

// import { useState } from 'react';
// import AddTaskModal from '@/components/AddTaskModal/AddTaskModal';

// export default function ModalPreviewPage() {
//   const [open, setOpen] = useState(true);

//   return (
//     <>
//       <button onClick={() => setOpen(true)}>Open task modal</button>

//       <AddTaskModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         mode="create"
//         title="Нове завдання"
//         formProps={{
//           taskToEdit: null,
//           onSuccess: () => {
//             console.log('task created (preview)');
//           },
//         }}
//       />
//     </>
//   );
// }

// // Новий запис у щоденнику (AddDiary)

// 'use client';

// import { useState } from 'react';
// import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';

// export default function ModalPreviewPage() {
//   const [isDiaryOpen, setIsDiaryOpen] = useState(false);

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Modal preview</h1>

//       {/* КНОПКА ОТКРЫТИЯ */}
//       <button
//         type="button"
//         onClick={() => setIsDiaryOpen(true)}
//         style={{
//           marginTop: 16,
//           padding: '10px 16px',
//           borderRadius: 8,
//           border: '1px solid #ccc',
//           cursor: 'pointer',
//         }}
//       >
//         Відкрити Diary modal
//       </button>

//       {/* MODAL */}
//       <AddDiaryEntryModal
//         isOpen={isDiaryOpen}
//         onClose={() => setIsDiaryOpen(false)}
//         mode="create"
//         title="Новий запис"
//       />
//     </div>
//   );
// }
