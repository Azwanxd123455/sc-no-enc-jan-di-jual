let moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
   usage: ['groupinfo', 'ginfo'],
   async: async (m, {
      client,
      participants
   }) => {
      let {
         banned,
         mute,
         game,
         welcome,
         left,
         notify,
         spamProtect,
         localonly,
         nobadword,
         nolink,
         novirtex,
         antitagall,
         adminmode,
         anti212,
         expired,
         stay
      } = global.db.groups[m.chat]
      let pic = await Func.fetchBuffer('./media/images/default.jpg')
      let meta = await (await client.groupMetadata(m.chat))
      let member = participants.map(u => u.id)
      let admin = await client.groupAdmin(m.chat)
      let sider = []
      let day = 86400000 * 7,
         now = new Date() * 1
      member.map(v => {
         if (typeof global.db.groups[m.chat].member[v] == 'undefined' || typeof global.db.groups[m.chat].member[v] != 'undefined' && (global.db.groups[m.chat].member[v].lastseen == 0 || ((now - global.db.groups[m.chat].member[v].lastseen) > day) && !global.db.users[v].premium && !global.db.groups[m.chat].member[v].whitelist && !global.db.users[v].whitelist) && v != client.user.id.split(':')[0] + '@s.whatsapp.net') sider.push(v)
      })
      try {
         pic = await Func.fetchBuffer(await client.profilePictureUrl(m.chat, 'image'))
      } catch {} finally {
      let buttons = [{
         buttonId: `.stat`,
         buttonText: {
            displayText: 'STATISTIC'
         }
      }]
         let caption = `❏  *G R O U P - I N F O*\n\n`
         caption += `	◦  *Nama* : ${meta.subject}\n`
         caption += `	◦  *Member* : ${member.length}\n`
         caption += `	◦  *Sider* : ${sider.length}\n`
         caption += `	◦  *Admin* : ${admin.length}\n`
         caption += `	◦  *Dibuat* : ${moment(meta.creation * 1000).format('DD/MM/YY HH:mm:ss')}\n`
         caption += `	◦  *Dibuat oleh* : ${meta.owner ? '@' + meta.owner.split('@')[0] : m.chat.match('-') ? '@' + m.chat.split('-')[0] : ''}\n\n`
         caption += `❏  *G R O U P - S E T T I N G*\n\n`
         caption += `	◦  *Antilink* : ${Func.switcher(nolink, 'ON', 'MATI')}\n`
         caption += `	◦  *Antivirtex* : ${Func.switcher(novirtex, 'ON', 'MATI')}\n`
         caption += `	◦  *Antitagall* : ${Func.switcher(antitagall, 'ON', 'MATI')}\n`
         caption += `	◦  *Adminmode* : ${Func.switcher(adminmode, 'ON', 'MATI')}\n`
         caption += `	◦  *Anti212* : ${Func.switcher(anti212, 'ON', 'MATI')}\n`
         caption += `	◦  *Mode game* : ${Func.switcher(game, 'ON', 'MATI')}\n`
         caption += `	◦  *Pesan keluar* : ${Func.switcher(left, 'ON', 'MATI')}\n`
         caption += `	◦  *Anti luar negri* : ${Func.switcher(localonly, 'ON', 'MATI')}\n`
         caption += `	◦  *Anti spam* : ${Func.switcher(notify, 'ON', 'MATI')}\n`
         caption += `	◦  *Keamanan* : ${Func.switcher(spamProtect, 'ON', 'MATI')}\n`
         caption += `	◦  *Pesan sambutan* : ${Func.switcher(welcome, 'ON', 'MATI')}\n\n`
         caption += `❏  *G R O U P - S T A T U S*\n\n`
         caption += `	◦  *Banned* : ${Func.switcher(banned, 'iya', 'tidak')}\n`
         caption += `	◦  *Muted* : ${Func.switcher(mute, 'iya', 'tidak')}\n`
         caption += `	◦  *Sewabot* : ${Func.switcher(stay, 'PERMANEN', '-')}\n\n`
         client.sendButton(m.chat, pic, caption, `info ${meta.subject}`, m, buttons, {
                    document: true
            }, {
                title: 'Tap! Join Group Official️',
                thumbnail: pic,
                fileName: Func.greeting(m.pushName)
            })
      }
   },
   group: true,
   cache: true,
   location: __filename
}
