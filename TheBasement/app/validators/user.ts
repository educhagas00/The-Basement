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
    password: vine.string().minLength(3).confirmed(),
  })
)

/**
 * Validates the user's update action
 */

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(3).trim().optional(),
    firstName: vine.string().minLength(3).trim().optional(),
    lastName: vine.string().minLength(3).trim().optional(),
    password: vine.string().minLength(3),
  })
)
