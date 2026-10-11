(()=>{
const t=window.__blocks, results=[];
function ok(v,n){if(!v)throw Error(n);results.push(n)}
const empty=()=>Array.from({length:8},()=>Array(8).fill(null));
t.fixture(empty(),[[[1,1]],[[1]],[[1]]]);
ok(t.snapshot().pieces.length===3,'three tray slots');
ok(!t.place(0,-1,0)&&!t.place(0,7,0),'reject out of bounds');
ok(t.place(0,2,3),'free placement');
ok(t.snapshot().grid[3][2]&&t.snapshot().grid[3][3],'exact chosen cells');
let before=JSON.stringify(t.snapshot());ok(!t.place(1,2,3)&&JSON.stringify(t.snapshot())===before,'reject overlap without consuming');
ok(t.place(1,0,0)&&t.place(2,1,0),'use remaining pieces');ok(t.snapshot().pieces.every(Boolean)&&t.snapshot().round===2,'refill only after all three');
let g=empty();g[4]=Array(8).fill('#ffe078');g[4][7]=null;t.fixture(g,[[[1]],[[1]],[[1]]]);t.place(0,7,4);ok(t.snapshot().grid[4].every(x=>!x)&&t.snapshot().score===101,'clear full row');
g=empty();for(let i=0;i<8;i++)g[i][3]='#ffe078';g[7][3]=null;t.fixture(g,[[[1]],[[1]],[[1]]]);t.place(0,3,7);ok(t.snapshot().grid.every(r=>!r[3])&&t.snapshot().score===101,'clear full column');
g=empty();for(let i=0;i<8;i++){g[3][i]='#ffe078';g[i][3]='#ffe078'}g[3][3]=null;t.fixture(g,[[[1]],[[1]],[[1]]]);t.place(0,3,3);ok(t.snapshot().grid.flat().every(x=>!x)&&t.snapshot().score===201,'simultaneous crossing row and column');
g=Array.from({length:8},(_,y)=>Array.from({length:8},(_,x)=>(x+y)%2?'#ffe078':null));t.fixture(g,[[[1]],[[1,1]],[[1]]]);t.place(0,0,0);ok(!t.snapshot().over,'one blocked piece does not end game');
t.fixture(g,[[[1]],[[1,1]],[[1],[1]]]);t.place(0,0,0);ok(t.snapshot().over,'all remaining pieces blocked ends game');ok(t.snapshot().grid.flat().every(x=>!x)&&t.snapshot().pieces.every(x=>!x),'loss clears entire board and tray');
before=JSON.stringify(t.snapshot());ok(!t.place(1,0,0)&&JSON.stringify(t.snapshot())===before,'cannot play after loss');t.reset();ok(!t.snapshot().over&&t.snapshot().score===0&&t.snapshot().pieces.every(Boolean),'restart');
let turns=0;for(let i=0;i<200;i++){let s=t.snapshot();if(s.over)t.reset();let placed=false;for(let k=0;k<3&&!placed;k++)for(let y=0;y<8&&!placed;y++)for(let x=0;x<8&&!placed;x++)if(t.fits(k,x,y))placed=t.place(k,x,y);if(placed)turns++;s=t.snapshot();ok(s.grid.length===8&&s.grid.every(r=>r.length===8),'grid invariant '+i)}
t.reset();return {passed:results.length,simulatedTurns:turns,checks:results.slice(0,16)};
})()
