let uid = 0
let now = Date.now()

export default function getUid() {
  return `rc-upload-${now}-${++uid}`
}