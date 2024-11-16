import { Router } from "express";
import {
  createNote,
  deleteNote,
  editNote,
  favouriteToggle,
  getNotes,
  pinToggle,
} from "./../controllers/note.controller";
import validateData from "./../middlewares/validateData.middleware";
import noteSchema from "./../validators/note.validator";

const noteRouter = Router();

noteRouter.route("/").get(getNotes);
noteRouter.route("/create").post(validateData(noteSchema), createNote);

noteRouter.route("/favourite-toggle/:id").put(favouriteToggle);
noteRouter.route("/pin-toggle/:id").put(pinToggle);

noteRouter.route("/edit/:id").put(validateData(noteSchema), editNote);
noteRouter.route("/delete/:id").delete(deleteNote);

export default noteRouter;
