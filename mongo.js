const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://vincentmarklynn:${password}@cluster0.iezelpx.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Mongoose makes things easy",
  date: new Date(),
  important: true,
});

const secondNote = new Note({
  content: "Another one",
  date: new Date(),
  important: false,
});

note.save().then((result) => {
  console.log("note saved!");
});

secondNote.save().then((result) => {
  console.log("second note saved!");
});

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
