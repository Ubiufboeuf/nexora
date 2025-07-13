import { Temporal } from 'temporal-polyfill'

export function parseDuration (d: number) {
  let duration = d

  const h = Math.floor(duration / 3600)
  duration -= 3600 * h
  const m = Math.floor(duration / 60)
  const s = duration % 60

  let horas = ''
  let minutos = `${m}:`
  const segundos = `${Math.floor(s)}`.padStart(2, '0')
  
  if (h) {
    horas = `${h}:`
    minutos = `${m.toString().padStart(2, '0')}:`
  }

  return `${horas}${minutos}${segundos}`
}

// == Guarda esto para cuando temporal funcione bien ==
export function getReleaseTime (timestampInMiliseconds: number) {
  const instant = Temporal.Instant.fromEpochMilliseconds(timestampInMiliseconds)
  // const instant = Temporal.Now.instant().subtract({ seconds: 0 })
  const timeZone = Temporal.Now.timeZoneId()
  const zonedDateTime = instant.toZonedDateTimeISO(timeZone)
  const now = Temporal.Now.instant()
  const nowZdt = now.toZonedDateTimeISO(timeZone)
  const dif = nowZdt.since(zonedDateTime, { smallestUnit: 'second', largestUnit: 'years' })

  let tiempo
  if (dif.years > 1) tiempo = `${dif.years} años`
  else if (dif.years) tiempo = `${dif.years} año`
  else if (dif.months > 1) tiempo = `${dif.months} meses`
  else if (dif.months) tiempo = `${dif.months} mes`
  else if (dif.weeks > 1) tiempo = `${dif.weeks} semanas`
  else if (dif.weeks) tiempo = `${dif.weeks} semana`
  else if (dif.days > 1) tiempo = `${dif.days} días`
  else if (dif.days) tiempo = `${dif.days} día`
  else if (dif.hours > 1) tiempo = `${dif.hours} horas`
  else if (dif.hours) tiempo = `${dif.hours} hora`
  else if (dif.minutes > 1) tiempo = `${dif.minutes} minutos`
  else if (dif.minutes) tiempo = `${dif.minutes} minuto`
  else if (dif.seconds > 1) tiempo = `${dif.seconds} segundos`
  else if (dif.seconds) tiempo = `${dif.seconds} segundo`
  else tiempo = '0 segundos'
  
  return `Hace ${tiempo}`
}

export function handleError (err: unknown, msg?: string, postMsg?: string) {
  if (typeof err === 'string') {
    const error = new Error(err)
    console.error(error.message)
  } else {
    console.error(msg, err, postMsg)
  }
}
