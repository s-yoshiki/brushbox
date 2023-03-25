// import { Button } from "ui";
import React, { useState, useEffect, useRef, useMemo } from "react"
import Layout from 'components/layout-app';
import html2canvas from "html2canvas";
import style from 'styles/pawapuro.module.css';

const Tokunou = () => {
  const [state, setState] = useState({
    text: '',
    glade: '',
    className: [style.tokunou, style.tokunasi].join(' ')
  });

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, text: e.target.value }));
  };

  const handleChangeClassName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({
      ...prevState,
      className: [style.tokunou, style[e.target.value]].join(' ')
    }));
  };

  const handleChangeGlade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({ ...prevState, glade: e.target.value }));
  };

  return useMemo(() => (
    <div className={style.tokunouGrp}>
      <span className={`${style['tokunou-rank']} ${state.className}`}>
        <input
          className={state.className}
          type="text"
          value={state.text}
          onChange={handleChangeText}
        />
        {state.glade.length > 0 && (
          <span className={style['tokunou-grade']}>{state.glade}</span>
        )}
      </span>
      <div className={style.tokunouSelect}>
        色:
        <select onChange={handleChangeClassName}>
          <option value="tokunasi">なし</option>
          <option value="akatoku">赤色</option>
          <option value="aotoku">青色</option>
          <option value="midoritoku">緑色</option>
        </select>
      </div>
      <div className={style.tokunouSelect}>
        特能:
        <select onChange={handleChangeGlade}>
          <option value="">なし</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
      </div>
    </div>
  ), [state]);
};


const Position = ({ label, position }: {
  label: string,
  position: 'infielder' | 'outfielder' | 'catcher' | 'pitcher'
}) => {
  const [className, setClass] = useState([
    style.position,
    style[position],
  ].join(' '));
  const [text, setText] = useState(label || '');
  const [color, setColor] = useState('infielder');
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => e.target.value)
  }
  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(() => e.target.value)
    setClass(() => [
      style.position,
      style[e.target.value],
    ].join(' '))
  }
  return (
    <span className={className}>
      <input type="text" className={className} onChange={handleChangeText} value={text} />
      <select onChange={handleChangeColor} value={color} className={style.positionSelect}>
        <option value="infielder">黄色 (内)</option>
        <option value="outfielder">緑色 (外)</option>
        <option value="catcher">青色 (捕)</option>
        <option value="pitcher">赤色 (投)</option>
      </select>
    </span>
  )
}

interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  const [text, setText] = useState<string>(label || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <span className={style.label}>
      <input type="text" onChange={handleChange} value={text} />
    </span>
  );
};

interface AngleRowProps {
  label: string;
}

const AngleRow: React.FC<AngleRowProps> = ({ label }) => {
  const [text, setText] = useState<string>('xx');
  const [angle, setAngle] = useState<string>(
    [style.angle4, style.angle].join(' ')
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAngle([style[e.target.value], style.angle].join(' '));
  };

  return (
    <div className={style.abilityrow}>
      <Label label={label} />
      <span className={style.angleContainer}>
        <span className={angle}>➡︎</span>
        <select className={style.angleSelect} onChange={handleChangeColor}>
          <option value="angle4">角度: 4</option>
          <option value="angle3">角度: 3</option>
          <option value="angle2">角度: 2</option>
          <option value="angle1">角度: 1</option>
        </select>
      </span>
      <input type="text" onChange={handleChange} value={text} />
    </div>
  );
};

const getRank = (n: number) => {
  if (n >= 90) return 'S';
  if (n >= 80) return 'A';
  if (n >= 70) return 'B';
  if (n >= 60) return 'C';
  if (n >= 50) return 'D';
  if (n >= 40) return 'E';
  if (n >= 20) return 'F';
  return 'G';
};

// const _AbilityRow = ({ label, value }: { label: string, value: string }) => {
//   const [text, setText] = useState(value || '');
//   const [rank, setRank] = useState(getRank(+value));
//   const [color, setColor] = useState([
//     style.abilityrowRank,
//     style[`ability${getRank(+value)}`],
//   ].join(' '));
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(() => e.target.value);
//     const rankTxt = getRank(+e.target.value);
//     setColor(() => [
//       style.abilityrowRank,
//       style[`ability${rankTxt}`],
//     ].join(' '));
//     setRank(() => rankTxt);
//   }
//   return (
//     <div className={style.abilityrow}>
//       <Label label={label} />
//       &nbsp;
//       <span className={color}>{rank}</span>
//       &nbsp;
//       &nbsp;
//       <input type="text" onChange={handleChange} value={text} />
//     </div>
//   )
// }

const AbilityRow = ({ label, value }: { label: string; value: string }) => {
  const [text, setText] = useState(value ?? '');
  const [rank, setRank] = useState('S');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const [color, setColor] = useState([style.abilityrowRank, style.abilityS].join(' '));
  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRank = e.target.value;
    setRank(selectedRank);
    setColor([style.abilityrowRank, style[`ability${selectedRank}`]].join(' '));
  };
  return (
    <div className={style.abilityrow}>
      <Label label={label} />
      <span className={style.rankContainer}>
        <span className={color}>{rank}</span>
        <select onChange={handleChangeColor} className={style.rankSelect} defaultValue="">
          <option value="" disabled hidden></option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select>
      </span>
      <input type="text" onChange={handleChange} value={text} />
    </div>
  );
};

const BasicAbilityRow = ({ label }: { label: string }) => {
  const [text, setText] = useState(label ?? '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className={style.abilityrow}>
      <Label label={label} />
      &nbsp;
      <input type="text" onChange={handleChange} value={text} />
    </div>
  );
};

const Profile = () => {
  return (
    <div className={`bg-[#EBF6F8] p-1 rounded ${style.fontFamily}`}>
      {/* 上段 */}
      <div className="p-1 rounded grid grid-cols-3">
        <div className="col-span-1 rounded">
          <div className="m-1 p-1 grid grid-cols-2">
            <div className="col-span-1">
              <Position label="山田太郎" position="infielder" />
            </div>
            <div className="col-span-1 grid grid-cols-2">
              <div className="col-span-1 bg-white m-0.5"></div>
              <div className="col-span-1 bg-white m-0.5"></div>
            </div>
          </div>
          <BasicAbilityRow label="守備位置" />
        </div>
        <div className="col-span-2 rounded grid grid-cols-5">
          <div className="col-span-1 bg-white p-1 m-1 rounded"></div>
          <div className="col-span-4">
            <BasicAbilityRow label="出 身" />
            <BasicAbilityRow label="投 打" />
          </div>
        </div>
      </div>
      {/* 下段 */}
      <div className="bg-[#C2DBF8] p-1 rounded grid grid-cols-3">
        <div className="col-span-1 rounded">
          {/* 基本能力 */}
          <AngleRow label="弾道" />
          <AbilityRow label="ミート" value="90" />
          <AbilityRow label="パワー" value="80" />
          <AbilityRow label="走力" value="70" />
          <AbilityRow label="肩力" value="50" />
          <AbilityRow label="守備力" value="40" />
          <AbilityRow label="捕球" value="10" />
        </div>
        <div className="col-span-2 bg-[#F8F9FB] rounded m-1 grid grid-cols-4 p-0.5">
          {/* 特殊能力 */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(row => {
            return (
              <React.Fragment key={row}>
                {[1, 2, 3, 4].map(col => {
                  return (
                    <span key={col} className="col-span-1">
                      <Tokunou />
                    </span>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * @param uri 
 * @see https://oldbigbuddha.dev/posts/react-component-to-png
 */
const saveAsImage = (uri: string) => {
  const downloadLink = document.createElement("a");
  if (typeof downloadLink.download === "string") {
    downloadLink.href = uri;
    // ファイル名
    downloadLink.download = "component.png";
    // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
    document.body.appendChild(downloadLink);
    // ダウンロードリンクが設定された a タグをクリック
    downloadLink.click();
    // Firefox 対策で追加したリンクを削除しておく
    document.body.removeChild(downloadLink);
  } else {
    window.open(uri);
  }
}

export const Index = () => {
  // const [context, setContext] = useState(null)
  // const [loaded, setLoaded] = useState(false)
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // if (!canvasRef.current) {
    //   throw new Error("objectがnull")
    // }
    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext("2d");
    // if (!ctx) {
    //   throw new Error("context取得失敗")
    // }
    // ctx.fillStyle = "#000000"
    // ctx.fillRect(0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2)
  }, [])

  const onClick = async () => {
    if (!htmlRef.current || !canvasParentRef.current) {
      // throw new Error("error");
      return
    }
    const canvas = await html2canvas(htmlRef.current, {
      // backgroundColor: '#FFF',
      // removeContainer: true,
    });
    // debug
    // saveAsImage(canvas.toDataURL("img/png"));
    const canvasParent = canvasParentRef.current;
    while (canvasParent.firstChild) {
      canvasParent.removeChild(canvasParent.firstChild)
    }
    canvasParent.appendChild(canvas);
  }
  const title = `パワプロ風能力値メーカー`
  return (
    <Layout title={`test`}>
      <div className="min-w-[655px]" ref={htmlRef}>
        <Profile />
        {/* <div className="bg-slate-200">Web</div>
        <div className="text-3xl font-bold">
          Hello world!
        </div> */}
        {/* <textarea className="bg-slate-300"></textarea> */}
      </div>
      <div ref={canvasParentRef} className="bg-slate-300"></div>
      {/* <canvas ref={canvasRef} className="bg-slate-300" width={600} height={450} /> */}
      <button onClick={() => onClick()}>run</button>
    </Layout>
  );
}

export default Index;