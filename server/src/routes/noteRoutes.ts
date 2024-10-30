import { Router } from "express";
import {
  createNote,
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

noteRouter.route("/add-to-favourite/:id").get(favouriteToggle("add"));
noteRouter.route("/remove-from-favourite/:id").get(favouriteToggle("remove"));

noteRouter.route("/pin/:id").get(pinToggle("pin"));
noteRouter.route("/unpin/:id").get(pinToggle("unpin"));

noteRouter.route("/edit/:id").put(validateData(noteSchema), editNote);

export default noteRouter;
