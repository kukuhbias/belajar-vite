import { fetchData } from "./libs/fetch";
import { Inote } from "./types/entity";

interface INoteResult {
  data: Inote[];
}

const API_URL: string = "https://v1.appbackend.io/v1/rows/xRoO0hYTFKMf";

async function renderNotes() {
  const notes = await fetchData<INoteResult>(API_URL);

  if (!notes) {
    console.log("aplikasi Error");
    return;
  }
  notes.data.map((note) => {
    const newNote = document.createElement("div");
    const newTitileNote = document.createElement("h3");
    const newContentNote = document.createElement("p");
    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.setAttribute("id", note._id);
    newDeleteBtn.textContent = `hapus`;
    newDeleteBtn.onclick = function () {
      deleteBtn(note._id);
    };

    newTitileNote.textContent = note.title;
    newContentNote.textContent = note.content;
    newNote.append(newTitileNote, newContentNote, newDeleteBtn);
    document.body.append(newNote);
  });
}

renderNotes();

//create New Notes
const titleInput = document.getElementById("title") as HTMLInputElement;
const contentInput = document.getElementById("content") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submitBtn");

submitBtn?.addEventListener("click", async () => {
  const title = titleInput.value;
  const content = contentInput.value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ title, content }]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
});

//delete Notes function

async function deleteBtn(id: string) {
  try {
    await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id]),
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.reload();
  }
}
