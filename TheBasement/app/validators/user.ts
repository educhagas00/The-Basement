import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).trim(),
    firstName: vine.string().minLength(3).trim(),
    lastName: vine.string().minLength(3).trim(),
    email: vine.string().email().trim(),
    password: vine.string().minLength(3).confirmed()
  })
)