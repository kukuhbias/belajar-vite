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
    newNote.setAttribute("class", "div-body-content");
    const newInnerNote = document.createElement("div");
    newInnerNote.setAttribute("class", "div-body-content-inner");
    const newTitileNote = document.createElement("h2");
    const newContentNote = document.createElement("p");
    const newDeleteImg = document.createElement("img");
    newDeleteImg.src =
      "https://api.iconify.design/emojione:cross-mark.svg?color=%23888888";
    newDeleteImg.setAttribute("class", "delete-btn");
    newDeleteImg.setAttribute("id", note._id);
    newDeleteImg.onclick = function () {
      deleteBtn(note._id);
    };

    newTitileNote.textContent = note.title;
    newContentNote.textContent = note.content;
    newInnerNote.append(newTitileNote, newContentNote);
    newNote.append(newInnerNote, newDeleteImg);
    //document.body.append(newNote);
    const divBody = document.getElementById("div-body") as HTMLCanvasElement;
    divBody.append(newNote);
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
