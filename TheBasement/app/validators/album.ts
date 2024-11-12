import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { release } from 'os'

/**
 * Validates the album's creation action
 */
export const createAlbumValidator = vine.compile (
    vine.object({
        album_id: vine.string().trim(),
        name: vine.string().trim(),
        price: vine.number().min(0),
        duration: vine.number().min(0),
        release_date: vine.date({
            formats: ['YYYY/DD/MM', 'x'],
        }),
        cover_path: vine.string().trim(),
    })
)

/**
 * Validates the album's update action
 */
export const updateAlbumValidator = vine.compile (
    vine.object({
        name: vine.string().trim().optional(),
        price: vine.number().min(0).optional(),
        duration: vine.number().min(0).optional(),
    })
)