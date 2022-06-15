const timestamps = {
    created_at: String,
    updated_at: String
}
// Cashbox Model
const Friends = {
    id: Number,
    name: String,
    age: String,
    ...timestamps
}

export default {
    Friends,
}