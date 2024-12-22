import vine from '@vinejs/vine'

/**
 * Validates the album creation action
 */

export const urlAlbumValidator = vine.compile(
  vine.object({
    albumId: vine.string().trim().minLength(5),
  })
)

export const createAlbumValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    price: vine.number().min(0),
    duration: vine.number().min(0),
    releaseDate: vine.date(),
    coverPath: vine.string().trim().minLength(5),
  })
)

export const updateAlbumValidator = vine.compile(
  vine.object({
    albumId: vine.string().minLength(5),
    name: vine.string().trim().minLength(3).optional(),
    price: vine.number().min(0).optional(),
    duration: vine.number().min(0).optional(),
  })
)
