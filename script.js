// Note counter to give each note a unique ID
        let i = 0;

        // Get button and container references
        let btn = document.getElementById('btn');
        let notesContainer = document.querySelector('.notes-container');

        // Function to load notes from localStorage on page load
        function showNotes() {
            let savedNotes = localStorage.getItem('notes');
            if (savedNotes) {
                notesContainer.innerHTML = savedNotes;
                reapplyListeners(); // Reconnect events for delete/edit
            }
        }

        // Event: Click on "Create Notes"
        btn.addEventListener('click', () => {
            // Create main note container
            let noteDiv = document.createElement('div');
            noteDiv.className = 'note-container';
            noteDiv.setAttribute('id', i++);

            // Create editable note area
            let notes = document.createElement('p');
            notes.className = 'notes';
            notes.setAttribute('contenteditable', 'true');
            notes.setAttribute('tabindex', '0');
    
            // Create delete icon
            let image = document.createElement('img');
            image.setAttribute('src', './assets/dustbin.png');
            image.setAttribute('title','Click to delete');
            image.className = 'delete-img';
            
            // Append note and delete icon to container
            noteDiv.appendChild(notes);
            noteDiv.appendChild(image);
            notesContainer.appendChild(noteDiv);

            // Make sure new note has event listeners
            reapplyListeners();

            // Save current state to localStorage
            updateStorage();
        });

        // Save notes HTML to localStorage
        function updateStorage() {
            localStorage.setItem('notes', notesContainer.innerHTML);
        }

        // Attach delete and keyup listeners to existing notes
        function reapplyListeners() {
            // Delete note when trash icon is clicked
            document.querySelectorAll('.delete-img').forEach((img) => {
                img.addEventListener('click', (e) => {
                    e.target.parentElement.remove();
                    updateStorage();
                });
            });

            // Save note content on every key press
            document.querySelectorAll('.notes').forEach(note => {
                note.addEventListener('keyup', () => {
                    updateStorage();
                });
            });
        }

        // Make Enter key insert line break instead of creating new element
        document.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                document.execCommand('insertLineBreak');
                e.preventDefault();
            }
        });

        // Load notes on first page load
        document.addEventListener('DOMContentLoaded', showNotes);