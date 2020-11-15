/*1.设计一个学生类属性：学号，姓名，班级，成绩
                方法：构造方法2个
                      设置成绩的方法。
                      修改个人信息方法(不包括成绩)。
*/
public class Student {
	String num;
	String name;
	String classRoom;
	double score;
	Student(){
		num="";name="";classRoom="";score=0;
	}
	Student(String num,String name,String classRoom){
		this.num=num;this.name=name;this.classRoom=classRoom;
	}
	void set(double score) {
		this.score=score;
	}
	void set(String num,String name,String classRoom){
		this.num=num;this.name=name;this.classRoom=classRoom;
	}
}
