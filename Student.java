/*1.���һ��ѧ�������ԣ�ѧ�ţ��������༶���ɼ�
                ���������췽��2��
                      ���óɼ��ķ�����
                      �޸ĸ�����Ϣ����(�������ɼ�)��
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
