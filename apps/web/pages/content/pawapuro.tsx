import React, { useState, useRef } from "react";
import Layout from "components/layout-app";
import html2canvas from "html2canvas";
import style from "styles/pawapuro.module.css";

const Tokunou = () => {
  const [state, setState] = useState({
    text: "",
    glade: "",
    className: [style.tokunou, style.tokunasi].join(" "),
  });

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  return (
    <div className={style.tokunouGrp}>
      <span className={`${style["tokunou-rank"]} ${state.className}`}>
        <input
          className={state.className}
          type="text"
          value={state.text}
          onChange={(e) => handleChange("text", e)}
        />
        {state.glade.length > 0 && (
          <span className={style["tokunou-grade"]}>{state.glade}</span>
        )}
      </span>
      <div className={style.tokunouSelect}>
        色:
        <select
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              className: [style.tokunou, style[e.target.value]].join(" "),
            }))
          }
        >
          <option value="tokunasi">なし</option>
          <option value="akatoku">赤色</option>
          <option value="aotoku">青色</option>
          <option value="midoritoku">緑色</option>
        </select>
      </div>
      <div className={style.tokunouSelect}>
        特能:
        <select onChange={(e) => handleChange("glade", e)}>
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
  );
};

const Select = ({
  onChange,
  value,
  options,
  className,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: { value: string; label: string }[];
  className?: string;
}) => (
  <select onChange={onChange} value={value} className={className}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Position = ({
  label,
  position,
}: {
  label: string;
  position: "infielder" | "outfielder" | "catcher" | "pitcher";
}) => {
  const [className, setClassName] = useState(
    [style.position, style[position]].join(" ")
  );
  const [text, setText] = useState(label || "");
  const [color, setColor] = useState("infielder");

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newColor = e.target.value;
    setColor(() => e.target.value);
    setClassName(() => [style.position, style[newColor]].join(" "));
  };

  const positionOptions = [
    { value: "infielder", label: "黄色 (内)" },
    { value: "outfielder", label: "緑色 (外)" },
    { value: "catcher", label: "青色 (捕)" },
    { value: "pitcher", label: "赤色 (投)" },
  ];

  return (
    <span className={className}>
      <input
        type="text"
        className={className}
        onChange={handleChangeText}
        value={text}
      />
      <Select
        onChange={handleChangeColor}
        value={color}
        options={positionOptions}
        className={style.positionSelect}
      />
    </span>
  );
};

interface LabelProps {
  label: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  const [text, setText] = useState<string>(label || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <span className={style.label}>
      <input className={style.innerInput} type="text" onChange={handleChange} value={text} />
      {/* <span className={style.innerLabel}>{text}</span> */}
    </span>
  );
};

const AbilityRow = ({ label, value }: { label: string; value: string }) => {
  const [text, setText] = useState(value ?? "");
  const [rank, setRank] = useState("S");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const [color, setColor] = useState(
    [style.abilityrowRank, style.abilityS].join(" ")
  );
  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRank = e.target.value;
    setRank(selectedRank);
    setColor([style.abilityrowRank, style[`ability${selectedRank}`]].join(" "));
  };
  return (
    <div className={style.abilityrow}>
      <Label label={label} />
      <span className={style.rankContainer}>
        <span className={color}>{rank}</span>
        <select
          onChange={handleChangeColor}
          className={style.rankSelect}
          defaultValue=""
        >
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
  const [text, setText] = useState(label ?? "");
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

interface AngleRowProps {
  label: string;
}

const AngleRow: React.FC<AngleRowProps> = ({ label }) => {
  const [text, setText] = useState<string>("xx");
  const [angle, setAngle] = useState<string>(
    [style.angle4, style.angle].join(" ")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAngle([style[e.target.value], style.angle].join(" "));
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
          {Array.from({ length: 8 }, (_, row) => (
            <React.Fragment key={row}>
              {Array.from({ length: 4 }, (_, col) => (
                <span key={col} className="col-span-1">
                  <Tokunou />
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const saveAsImage = (canvas: HTMLCanvasElement, fileName: string) => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = fileName;
  link.click();
};


export const Index = () => {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const onClick = async () => {
    if (!htmlRef.current || !canvasParentRef.current) {
      return;
    }
    // const restoreInputs = replaceInputWithSpan(htmlRef.current);
    const canvas = await html2canvas(htmlRef.current);
    const canvasParent = canvasParentRef.current;
    while (canvasParent.firstChild) {
      canvasParent.removeChild(canvasParent.firstChild);
    }
    // canvasParent.appendChild(canvas);
    saveAsImage(canvas, "profile.png");
  };

  const title = `パワプロ風能力値メーカー`;
  return (
    <Layout title={`test`}>
      <div className="min-w-[655px]" ref={htmlRef}>
        <Profile />
      </div>
      <div ref={canvasParentRef} className="bg-slate-300"></div>
      <button className="btn" onClick={onClick}>
        画像にする
      </button>
    </Layout>
  );
};

export default Index;
