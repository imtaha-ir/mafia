import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useGame, type GameState } from "../data/contexts/game";

export default function SavedGames(){
    const game=useGame()
    const gameList =game.listGames()
    const fakeGames:GameState[]=[
       {
         id: 1,
         lastPlay: new Date("2025-08-27T14:30:00").getTime(),
         settings: {
           name: "بازی اول ",
           players: [{ name: "Nazanin", id: 1 }],
           roles: [{
             name: "mafia", id: 1,
             side: "MAFIA",
             min: 0,
             max: 0,
             description: ""
           }]
         },
        
         state: {
           status: "NEW",
           gameCycleStep: undefined
         },
         logs: []
       },

  
            {
         id: 2,
         lastPlay: new Date("2025-05-27T17:30:00").getTime(),
         settings: {
           name: "بازی دوم ",
           players: [{ name: "Taha", id: 2 }],
           roles: [{
             name: "mafia", id: 1,
             side: "MAFIA",
             min: 0,
             max: 0,
             description: ""
           }]
         },
       
         state: {
           status: "NEW",
           gameCycleStep: undefined
         },
         logs: []
       },

  
    

    ]
   
    return ( 
     <Box >
      <Typography >
        بازی‌های ذخیره‌شده
      </Typography>
      
      {fakeGames.length === 0 ? (
        <Typography >
          هنوز هیچ بازی‌ای ذخیره نشده.
        </Typography>
        
      ) : (
        fakeGames.map((savedGame) => (
          <Card key={savedGame.id} >
            <CardContent>
              <Typography >{savedGame.settings.name}</Typography>
              <Typography >
                تاریخ ذخیره: {new Date(savedGame.lastPlay).toLocaleString("fa-IR")}

              </Typography>
            <Box>
            <Button
               
                onClick={() => game.loadGame(savedGame.id)}
              >
                ادامه بازی
              </Button></Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );


}