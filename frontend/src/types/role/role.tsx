import { z } from "zod";

const idType = z.number().min(1, {
  message: "ID must be a positive number.",
}).optional().nullable();
const descriptionType = z.string().min(2, {
  message: "Description must be at least 2 characters.",
})

export const RoleSchema = z.object({
  id: idType,
  description: descriptionType
//  list: z.array(UserSchema), // Define the list of UserSchema
});

export type RoleDto = z.infer<typeof RoleSchema>; 

/*export default class RoleDto {
    id:number;
    description: string;
  }*/
